import 'dart:convert';

import 'package:app/views/widgets/form/DialogBox.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool isLoading = true;
  String? token;
  Map<String, dynamic>? userData;

  Future<void> getTokenFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    token = preferences.getString('token');
  }

  Future<void> getUserDataFromLocalStorage() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? userDataString = preferences.getString('user');
    userData = jsonDecode(userDataString ?? '');
    setState(() {
      isLoading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    getTokenFromLocalStorage();
    getUserDataFromLocalStorage();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: isLoading
            ? Center(
                child: CircularProgressIndicator(),
              )
            : (userData != null)
                ? Container(
                    padding: EdgeInsets.only(left: 35, right: 35, top: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          userData!["name"],
                          style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(
                          height: 13,
                        ),
                        Text(
                          userData!["universityName"],
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        Text(
                          "email: ${userData!["email"]}",
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        Text(
                          "Skills: ${userData!["skills"].join(", ")}",
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  )
                : DialogBox(
                    title: "Error",
                    message: "Unable to load profile, please try again",
                  ));
  }
}
