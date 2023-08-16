import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/widgets/form/DialogBox.dart';
import 'package:app/views/widgets/form/TextInput.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  //controllers
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController universityController = TextEditingController();
  TextEditingController nameController = TextEditingController();

  //dialog box
  String title = '';
  String message = '';

  void registerUser() async {
    if (emailController.text.isNotEmpty &&
        passwordController.text.isNotEmpty &&
        nameController.text.isNotEmpty &&
        universityController.text.isNotEmpty) {
      var headers = {
        'Content-Type': 'application/json',
      };

      var request =
          http.Request('POST', Uri.parse('${baseUrl}/applicant/auth/signup'));

      request.body = json.encode({
        "name": nameController.text,
        "email": emailController.text,
        "password": passwordController.text,
        "universityName": universityController.text
      });

      nameController.clear();
      emailController.clear();
      passwordController.clear();
      universityController.clear();
      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 201) {
        setState(() {
          title = 'Success';
          message = 'User created successfully';
        });
      } else {
        setState(() {
          title = 'Error';
          message = 'An error occured. Please try again!';
        });
        print(response.reasonPhrase);
      }
    }
  }

  void _showSuccessDialog(BuildContext context) {
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
        backgroundColor: Color(0xffdeebff),
        appBar: AppBar(
          title: const Text('Application Tracking System'),
          toolbarHeight: 70,
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.only(top: 20),
          child: Container(
            padding: EdgeInsets.only(right: 35, left: 35),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Sign Up',
                    style: TextStyle(
                      fontSize: 45,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(
                    height: 60,
                  ),
                  TextInput(
                    controller: nameController,
                    placeholder: 'Name',
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextInput(
                    controller: emailController,
                    placeholder: 'Email Address',
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextInput(
                    controller: universityController,
                    placeholder: 'University Name',
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextInput(
                    controller: passwordController,
                    placeholder: 'Password',
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                          onPressed: () {}, child: Text('Forgot Password'))
                    ],
                  ),
                  SizedBox(height: 50),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size.fromHeight(50),
                    ),
                    onPressed: () {
                      registerUser();
                      _showSuccessDialog(context);
                    },
                    child: Text('Sign Up'),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, 'login');
                    },
                    child: Text('Already have an account? Login'),
                  ),
                ]),
          ),
        ));
  }
}
