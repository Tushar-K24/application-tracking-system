import 'dart:convert';

import 'package:app/config.dart';
import 'package:app/views/widgets/form/DialogBox.dart';
import 'package:app/views/widgets/form/TextInput.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  //controllers
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  //dialog box
  String title = '';
  String message = '';

  late SharedPreferences prefs;

  void initState() {
    super.initState();
    initSharedPref();
  }

  void initSharedPref() async {
    prefs = await SharedPreferences.getInstance();
  }

  Future<void> loginUser() async {
    try {
      if (emailController.text.isNotEmpty &&
          passwordController.text.isNotEmpty) {
        var headers = {
          'Content-Type': 'application/json',
        };

        var request =
            http.Request('POST', Uri.parse('${baseUrl}/applicant/auth/login'));

        request.body = json.encode({
          "email": emailController.text,
          "password": passwordController.text,
        });

        emailController.clear();
        passwordController.clear();
        request.headers.addAll(headers);

        http.StreamedResponse response = await request.send();

        if (response.statusCode == 200) {
          final String data = await response.stream.bytesToString();
          Map<String, dynamic> jsonResponse = jsonDecode(data);
          Map<String, dynamic> user = jsonResponse['user'];
          String token = jsonResponse['accessToken'];
          prefs.setString('token', token);
          prefs.setString('user', jsonEncode(user));
          setState(() {
            title = 'Success';
            message = 'User authenticated successfully';
          });
        } else {
          setState(() {
            title = 'Error';
            message = 'An error occured. Please try again!';
          });
          print('login error');
          print(response.reasonPhrase);
        }
      }
    } catch (e) {
      setState(() {
        title = 'Error';
        message = 'An error occured. Please try again!';
      });
      print("error $e");
    }
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
        backgroundColor: Color(0xffdeebff),
        appBar: AppBar(
          title: const Text('Application Tracking System'),
          toolbarHeight: 70,
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.only(top: 50),
          child: Container(
            padding: EdgeInsets.only(right: 35, left: 35),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Log in',
                    style: TextStyle(
                      fontSize: 45,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(
                    height: 60,
                  ),
                  TextInput(
                    controller: emailController,
                    placeholder: 'Email Address',
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
                    onPressed: () async {
                      await loginUser();
                      if (title == 'Success') {
                        Navigator.pushNamed(context, 'home');
                      } else {
                        _showDialogBox(context);
                      }
                    },
                    child: Text('Log In'),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, 'register');
                    },
                    child: Text('Don\'t have an account? Signup'),
                  ),
                ]),
          ),
        ));
  }
}
