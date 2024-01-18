import * as bcrypt from "bcrypt";

export const initialData = {
    users: [
      // Admin
      {
          email: "bryan.tapia03@epn.edu.ec",
          password: bcrypt.hashSync("Bryan1234", 10),
          fullName: "Bryan Tapia",
          roles: [
              "admin"
          ],
          department: "TI"
      },
      // Business Manager
      {
          email: "julio.sandobalin@epn.edu.ec",
          password: bcrypt.hashSync("Julio1234", 10),
          fullName: "Julio Sandobalin",
          roles: [
            "business_manager"
          ],
          department: "TI"
      },
      // Area Manager
      {
          email: "carlos.iniguez@epn.edu.ec",
          password: bcrypt.hashSync("Carlos1234", 10),
          fullName: "Carlos Íñiguez",
          roles: [
            "area_manager"
          ],
          department: "TI"
      },
      // Area Leader
      {
          email: "glender.miranda@epn.edu.ec",
          password: bcrypt.hashSync("Glender1234", 10),
          fullName: "Glender Miranda",
          roles: [
            "area_leader"
          ],
          department: "TI"
      },
      // Technician
      {
          email: "david.leon@epn.edu.ec",
          password: bcrypt.hashSync("David1234", 10),
          fullName: "David León",
          roles: [
            "technician"
          ],
          department: "TI"
      },
    ],

    boards: [
      {
          name: "Progress Board",
          description: "This is a board to track the progress of the activities",
          columns: 3,
      },
    ],
}