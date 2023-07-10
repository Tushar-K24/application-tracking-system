import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class JobDetailsPage extends StatefulWidget {
  final String jobID;
  const JobDetailsPage({super.key, required this.jobID});

  @override
  State<JobDetailsPage> createState() => _JobDetailsPageState();
}

class _JobDetailsPageState extends State<JobDetailsPage> {
  bool isLoading = true;
  Object? fetchedData;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      var request = http.Request(
          'GET', Uri.parse('http://192.168.0.103:3000/api/v1/jobs'));

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        final String data = await response.stream.bytesToString();
        print(data);
        setState(() {
          fetchedData = JobDataObject.fromJson(
              data); // Replace YourDataObject with the actual class representing the data
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
              ? Center(
                  child:
                      Text('Data fetched successfully and stored as an object'),
                )
              : Center(
                  child: Text('Failed to fetch data'),
                ),
    );
  }
}

class JobDataObject {
  final String id;
  final String organization;
  final String role;
  final String description;
  final List<String> skills;
  final String status;

  JobDataObject({
    required this.id,
    required this.organization,
    required this.role,
    required this.description,
    required this.skills,
    required this.status,
  });

  factory JobDataObject.fromJson(Map<String, dynamic> json) {
    return JobDataObject(
      id: json['_id'],
      organization: json['organization'],
      role: json['role'],
      description: json['description'],
      skills: List<String>.from(json['skills']),
      status: json['status'],
    );
  }
}
