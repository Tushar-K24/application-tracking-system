import 'dart:convert';

import 'package:app/views/pages/home.dart';
import 'package:app/views/pages/login.dart';
import 'package:app/views/pages/signup.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences preferences = await SharedPreferences.getInstance();
  String? accessToken = preferences.getString('accessToken');
  String? userDataString = preferences.getString('userData');
  Map<String, dynamic>? userData;
  if (userDataString != null) {
    userData = jsonDecode(userDataString) as Map<String, dynamic>;
  }

  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    initialRoute: (accessToken != null && userData != null) ? 'home' : 'login',
    routes: {
      'login': (context) => const Login(),
      'register': (context) => const Signup(),
      'home': (context) => const HomePage(),
    },
  ));
}
