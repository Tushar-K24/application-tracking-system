import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/widgets/form/DialogBox.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class JobDetailsPage extends StatefulWidget {
  final String jobID;
  const JobDetailsPage({super.key, required this.jobID});

  @override
  State<JobDetailsPage> createState() => _JobDetailsPageState();
}

class _JobDetailsPageState extends State<JobDetailsPage> {
  bool isLoading = true;
  JobDataObject? fetchedData;
  String? token;
  Map<String, dynamic>? userData;
  String title = '';
  String message = '';

  @override
  void initState() {
    super.initState();
    fetchData();
    getTokenFromLocalStorage();
    getUserDataFromLocalStorage();
  }

  Future<void> applyJob() async {
    try {
      var headers = {'Authorization': 'Bearer $token'};
      var request = http.Request(
        'POST',
        Uri.parse(
            '${baseUrl}/applicant/${userData!['_id']}/jobs/${widget.jobID}'),
      );

      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 201) {
        setState(() {
          title = 'Success';
          message = 'Applied Successfully';
        });
        print(await response.stream.bytesToString());
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
        print("Add new job: ${response.reasonPhrase}");
      }
    } catch (e) {
      setState(() {
        title = 'Error';
        message = 'Error occurred, please try again!';
      });
      print('Error: $e');
    }
  }

  Future<void> fetchData() async {
    try {
      var request =
          http.Request('GET', Uri.parse('${baseUrl}/jobs/${widget.jobID}'));

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        final String data = await response.stream.bytesToString();
        setState(() {
          fetchedData = JobDataObject.fromJson(jsonDecode(
              data)); // Replace YourDataObject with the actual class representing the data
          isLoading = false;
        });
      } else {
        setState(() {
          fetchedData = null;
          isLoading = false;
        });
        print(response.reasonPhrase);
      }
    } catch (e) {
      setState(() {
        fetchedData = null;
        isLoading = false;
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
    userData = jsonDecode(userDataString ?? '');
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
          : fetchedData != null
              ? Container(
                  padding: EdgeInsets.only(left: 35, right: 35, top: 30),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        fetchedData!.role,
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            fetchedData!.organization,
                            style: TextStyle(
                              color: Colors.grey.shade700,
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () async {
                              await applyJob();
                              _showDialogBox(context);
                              if (title == 'Expired') {
                                Navigator.pushNamed(context, 'login');
                              }
                            },
                            child: Text('Apply'),
                          ),
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
                        fetchedData!.description,
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
                        fetchedData!.skills.join(", "),
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
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
