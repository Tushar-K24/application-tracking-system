import 'package:flutter/material.dart';

class DialogBox extends StatelessWidget {
  final String title;
  final String message;

  const DialogBox({
    required this.title,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    if (title.isEmpty && message.isEmpty) {
      // Show a loader while the message is empty
      return Center(
        child: CircularProgressIndicator(),
      );
    } else {
      // Create a global key for the dialog
      final dialogKey = GlobalKey();

      // Dismiss the dialog after 1 second
      Future.delayed(Duration(seconds: 1), () {
        if (dialogKey.currentContext != null) {
          Navigator.of(dialogKey.currentContext!).pop();
        }
      });

      return AlertDialog(
        key: dialogKey, // Assign the global key to the dialog
        title: Text(title),
        content: Text(message),
      );
    }
  }
}
