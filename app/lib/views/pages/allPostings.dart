import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/pages/jobDetailsPage.dart';
import 'package:app/views/widgets/JobCard.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AllPostingsPage extends StatefulWidget {
  const AllPostingsPage({super.key});

  @override
  State<AllPostingsPage> createState() => _AllPostingsPageState();
}

class _AllPostingsPageState extends State<AllPostingsPage> {
  bool isLoading = true;
  List<dynamic> fetchedData = [];

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      var request = http.Request('GET', Uri.parse('${baseUrl}/jobs'));

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        final String data = await response.stream.bytesToString();
        setState(() {
          fetchedData = jsonDecode(data)[
              'jobs']; // Replace YourDataObject with the actual class representing the data
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
                  'New Jobs',
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
                      id: fetchedData[index]['_id'],
                      role: fetchedData[index]['role'],
                      organization: fetchedData[index]['organization']['name'],
                      description: fetchedData[index]['description'],
                      child: JobDetailsPage(jobID: fetchedData[index]['_id']),
                    );
                  },
                ),
              ],
            ),
    );
  }
}
