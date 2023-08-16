import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/pages/appliedJobDetailsPage.dart';
import 'package:app/views/widgets/JobCard.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AppliedJobsPage extends StatefulWidget {
  const AppliedJobsPage({super.key});

  @override
  State<AppliedJobsPage> createState() => _AppliedJobsPageState();
}

class _AppliedJobsPageState extends State<AppliedJobsPage> {
  bool isLoading = true;
  List<dynamic> fetchedData = [];
  String? token;
  Map<String, dynamic>? userData;

  @override
  void initState() {
    super.initState();
    initLocalStorage();
  }

  Future<void> initLocalStorage() async {
    await getTokenFromLocalStorage();
    await getUserDataFromLocalStorage();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      var headers = {'Authorization': 'Bearer $token'};
      var request = http.Request(
        'GET',
        Uri.parse('${baseUrl}/applicant/${userData!['_id']}/jobs'),
      );

      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        final String data = await response.stream.bytesToString();
        setState(() {
          fetchedData = jsonDecode(data)['applications'];
          isLoading = false;
        });
      } else {
        setState(() {
          fetchedData = [];
          isLoading = false;
        });
        print(response.reasonPhrase);
      }
    } catch (e) {
      setState(() {
        fetchedData = [];
        isLoading = false;
      });
      print('Error: $e');
    }
  }

  Future<void> getTokenFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
    });
  }

  Future<void> getUserDataFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? userDataString = preferences.getString('user');
    setState(() {
      userData = jsonDecode(userDataString ?? '');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(left: 35, right: 35, top: 20),
      child: isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Applied Jobs',
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                // JobCard(
                //   role: fetchedData[0]['role'],
                //   organization: fetchedData[0]['organization']['name'],
                //   description: fetchedData[0]['description'],
                // ),
                ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  scrollDirection: Axis.vertical,
                  itemCount: fetchedData.length,
                  itemBuilder: (BuildContext context, int index) {
                    return JobCard(
                      id: fetchedData[index]['job']['_id'],
                      role: fetchedData[index]['job']['role'],
                      organization: fetchedData[index]['job']['organization']
                          ['name'],
                      description: fetchedData[index]['job']['description'],
                      child: AppliedJobDetailsPage(
                          application: fetchedData[index]),
                    );
                  },
                ),
              ],
            ),
    );
  }
}
