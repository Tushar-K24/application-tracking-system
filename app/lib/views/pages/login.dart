import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xffdeebff),
        appBar: AppBar(
          title: const Text('Application Tracking System'),
          toolbarHeight: 70,
        ),
        body: Center(
          child: Column(children: [
            Text('Login',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w600,
                )),
            Text('Login',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w600,
                )),
            Container(
              child: Column(
                children: [
                  TextField(
                    decoration: InputDecoration(hintText: 'Email'),
                  ),
                  TextField(),
                ],
              ),
            )
          ]),
        ));
  }
}
