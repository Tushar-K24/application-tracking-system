import 'package:flutter/material.dart';

class JobCard extends StatelessWidget {
  final String id;
  final String role;
  final String organization;
  final String description;
  final Widget child;
  const JobCard(
      {required this.id,
      required this.role,
      required this.organization,
      required this.description,
      required this.child,
      super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.hardEdge,
      child: InkWell(
        splashColor: Colors.blue.withAlpha(30),
        onTap: () {},
        child: Container(
            width: 400,
            height: 210,
            padding: EdgeInsets.only(left: 20, right: 20, top: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  this.role,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                  softWrap: false,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(
                  height: 5,
                ),
                Text(
                  this.organization,
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                  ),
                  softWrap: false,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(
                  height: 20,
                ),
                Text(
                  'Description: ',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                  softWrap: false,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  this.description,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                  ),
                  softWrap: false,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) => child));
                      },
                      child: Text('View more'),
                    ),
                  ],
                ),
              ],
            )),
      ),
    );
  }
}
