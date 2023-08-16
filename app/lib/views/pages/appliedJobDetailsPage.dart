import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/widgets/form/DialogBox.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AppliedJobDetailsPage extends StatefulWidget {
  final Map<String, dynamic> application;
  const AppliedJobDetailsPage({super.key, required this.application});

  @override
  State<AppliedJobDetailsPage> createState() => _AppliedJobDetailsPageState();
}

class _AppliedJobDetailsPageState extends State<AppliedJobDetailsPage> {
  bool isLoading = true;
  String? token;
  Map<String, dynamic>? userData;
  String title = '';
  String message = '';

  @override
  void initState() {
    super.initState();
    getTokenFromLocalStorage();
    getUserDataFromLocalStorage();
    isLoading = false;
  }

  Future<void> withdrawApplication() async {
    try {
      print(userData);
      var headers = {'Authorization': 'Bearer $token'};
      var request = http.Request(
        'PUT',
        Uri.parse(
            '$baseUrl/applicant/${userData!['_id']}/jobs/${widget.application["job"]["_id"]}'),
      );
      request.body = json.encode({"isWithdrawn": true});
      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      print(await response.stream.bytesToString());
      if (response.statusCode == 201) {
        setState(() {
          title = 'Success';
          message = 'Withdrawn Successfully';
        });
      } else if (response.statusCode == 405) {
        setState(() {
          title = 'Error';
          message = 'Already Applied';
        });
      } else if (response.statusCode == 401) {
        setState(() {
          title = 'Error';
          message = 'Session Expired!';
        });
      } else {
        setState(() {
          title = 'Error';
          message = 'Error occurred, please try again!';
        });
        print("Withdraw job: ${response.reasonPhrase}");
      }
    } catch (e) {
      setState(() {
        title = 'Error';
        message = 'Error occurred, please try again!';
      });
      print('Error: $e');
    }
  }

  Future<void> getTokenFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    token = preferences.getString('token');
  }

  Future<void> getUserDataFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? userDataString = preferences.getString('user');
    setState(() {
      userData = jsonDecode(userDataString ?? '');
    });
  }

  void _showDialogBox(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return DialogBox(
          title: title,
          message: message,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Job Details'),
      ),
      body: isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : widget.application != null
              ? Container(
                  padding: EdgeInsets.only(left: 35, right: 35, top: 30),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.application!["job"]["role"],
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            widget.application!["job"]["organization"]["name"],
                            style: TextStyle(
                              color: Colors.grey.shade700,
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.only(
                              left: 20,
                              right: 20,
                              top: 10,
                              bottom: 10,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.grey.shade400,
                              borderRadius: BorderRadius.circular(30),
                            ),
                            child: Text(
                              widget.application["status"],
                              style: TextStyle(
                                color: Colors.grey.shade700,
                                fontSize: 17,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          )
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Text(
                        'Description',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        widget.application!["job"]["description"],
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Text(
                        'Skills',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        widget.application!["job"]["skills"].join(", "),
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          ElevatedButton(
                            onPressed: () async {
                              await withdrawApplication();
                              _showDialogBox(context);
                              if (title == 'Expired') {
                                Navigator.pushNamed(context, 'login');
                              }
                            },
                            child: Text('Withdraw'),
                          ),
                        ],
                      )
                    ],
                  ),
                )
              : Center(
                  child: Text('Failed to fetch data'),
                ),
    );
  }
}

class JobDataObject {
  String id;
  String organization;
  String role;
  String description;
  List<String> skills;
  String status;

  JobDataObject({
    required this.id,
    required this.organization,
    required this.role,
    required this.description,
    required this.skills,
    required this.status,
  });

  factory JobDataObject.fromJson(Map<String, dynamic> json) {
    json = json['job'];
    return JobDataObject(
      id: json['_id'],
      organization: json['organization']['name'],
      role: json['role'],
      description: json['description'],
      skills: List<String>.from(json['skills']),
      status: json['status'],
    );
  }
}
