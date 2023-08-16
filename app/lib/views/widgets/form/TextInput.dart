import 'package:flutter/material.dart';

class TextInput extends StatelessWidget {
  final String placeholder;
  final TextEditingController controller;
  const TextInput({
    required this.controller,
    required this.placeholder,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: this.controller,
      decoration: InputDecoration(
          fillColor: Colors.grey.shade100,
          filled: true,
          hintText: placeholder,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular((5)))),
    );
  }
}
