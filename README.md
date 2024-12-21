# API Documentation

## Authentication Endpoints

### Login
- **URL**: `/api/user/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "data": {
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "ADMIN | PENGURUS | ANGGOTA",
        "admin": null | { id: "string", userId: "string" },
        "pengurus": null | { id: "string", userId: "string", jabatan: "string" },
        "anggota": null | { id: "string", userId: "string" }
      },
      "token": "jwt_token"
    }
  }
  ```
  if role = "PENGURUS" : <br>
  ```json
   {
   "success": true,
   "message": "Login Successful",
   "data": {
      "user": {
         "id": "string",
         "name": "string",
         "email": "string",
         "role": "PENGURUS",
         "jabatan": "jabatan",
         "pengurus": {
            "id": "string",
            "userId": "string"
         }
      },
      "token": "jwt-token"
   }
   }
  ```

- **Roles**:
  - `ADMIN`: Full system access
  - `PENGURUS`: Management level access (e.g., bendahara)
  - `ANGGOTA`: Basic member access

## Absensi (Attendance) Endpoints

### Create Absensi
- **URL**: `/api/absensi`
- **Method**: `POST`
- **Authorization**: Admin Token Required
- **Request Body**:
  ```json
  {
    "status": "OPEN",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Data berhasil ditambahkan",
    "data": {
      "id": "string",
      "createdAt": "timestamp",
      "status": "OPEN",
      "password": "hashed_password"
    }
  }
  ```
- **Restrictions**:
  - Only ADMIN can create absensi

### Update Absensi Status
- **URL**: `/api/absensi/:id`
- **Method**: `PUT`
- **Authorization**: Admin Token Required
- **Request Body**:
  ```json
  {
    "status": "CLOSE"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Data absensi berhasil diupdate"
  }
  ```

### Submit Attendance
- **URL**: `/api/user/absensi`
- **Method**: `POST`
- **Authorization**: User Token Required
- **Request Body**:
  ```json
  {
    "idAbsensi": "string",
    "status": "Hadir",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "createdAt": "timestamp",
      "userId": "string",
      "idAbsensi": "string",
      "status": "Hadir"
    }
  }
  ```
- **Error Responses**:
  - If absensi is closed: `{ "success": false, "message": "Absensi Telah Ditutup" }`
  - If not admin creating absensi: `{ "success": false, "message": "Anda bukan Admin!" }`
  - if password incorrect: `{ "success": false, "message": "Invalid Password" }`

## Notes
- All endpoints require JWT authentication
- Token is sent in `Authorization` header
- Tokens expire after 1 hour
- Different roles have different access levels

## Error Handling
- Consistent error response format:
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```

## Authentication Workflow
1. Login to receive JWT token
2. Use token in subsequent requests
3. Token must be included in `Authorization` header
4. Different endpoints have role-based access control