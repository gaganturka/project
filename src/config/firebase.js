
  import firebase from 'firebase';

  const firebaseConfig = {
    type: "service_account",
    projectId: "borhan-33e53",
    private_key_id: "78e6d9a4ab437e0cff49f380eee73610687d0fd4",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvGPDNPm/8zjKm\nX6GSLUwZzSe/LO/j649hV0E4RMwjaF5YwUTXAnOvTttdwaaxZ0tQEEckIJrP1QkW\n87k9b+yNMcZ0dqW/c0uFCwKSupdCKOqxvwU/9+Sf+XW8vhVlHU1WfODuyBRaj1DF\nNyBYQUM7x+ZNEWznRiRrYKqHztocGT95qINjUPTQEmPVVp2fZ/3Kyn+bvOQF+Qj7\nv9dProk3hzXkS4dObJfhyWPYg+ZlocnGeXpzKvrfY7bVmT1lyRtoAwTYzzmR6Ewy\nM1JoTyUTotqTc0r2Ji/KCO5SYbkp1558W6j9N6Sz8d1NBpuqEl/5LyJpUroIcS81\nizhNi7vtAgMBAAECggEAF0yBykW7IBAN9E54UNufKzW9yrX/i7vt/b1fC843vaRn\nHXdGIjgMzbB4Bx87/5InltU7qiZ+gxYtWfT/Wpn4h4cuiZO6FWIRk/f1lTGn6+FG\n7XTmDW9+Z/0JOh6u+R/viQkf4xYTg0Nbs4pUzvmMKTm9vtaJP7L5KKKZvm17X06S\nXGf2drXPkv87D+TUQvjmgLP5HLntLSQR6x8G4toAKvT0Uo9aHbAFpFQw7iUoirkj\nCn+wA2vwXjg2T5H1oaEarwVSCX71U6dXPD61A207xOGzFMFKfOTotoVMlkXPFN91\nu1U3Dj6erJbUbJ6eRl1+ej98ey4htEOFv9KnTt1pTwKBgQDcYHI+ocGKQkWBwVuj\nd2G2A99NoPzK9ysCUqJCG2HCT5n5NWRF/ZmkjRSlHcLQkrGcZlxPQrBr+UwVjf91\nvQ9Z2b/BfYXAZhGw3LJJFiugXZBIZTAtV0QC6/Vpm5MPzuAVrSrk/lJYSWgRVnPk\nT9Wr3Y3ktC0+0E5BZ2zSSkxIrwKBgQDLZsLnImXiNw8JDy8QpiI2pQrgO0YkCPhq\nHQ8jsBGQq/pZ3N6xUqPah4L+VZcowxwo3YQ82Ae5JvtM6qa8FxU/+WISFnYz27Dy\nNf3waIP6Eta6y9W6Se4PtEmW1uHDEOK0A1BXZNgmO3624xCRqOORfW5JanJLhMdS\noh3lRVn0IwKBgQC3SXPbSZd5kVLT72hzFXhr9N6FZw65FEduICIZj0KIZMIv9csX\nNyvRIxF3nsAHzunvpWbC+TlYJDi2eKpuVzbsSOFmYSqb8YhnK7cQeGMCdq7ot1gR\nbdIACBXNpvnyHOJcxPC3EhqUmUD3ooqy6f9ReOxpub0j0AY1+XoVkHvPuwKBgCcp\nT9lEjC0zwJdT7xHbirbOq/tkLir99yYnFiUe3yLlmbv3hIDLknSepp/lRsc4WZGc\npLs6NLJ3SOcUPqn0H8lDcJhe7r8pSzY3Iv9IgDCDtAge+rV1SnqHkauTD8CI3b0e\n7jcFWYBy8ACyUxxYUghPCA7mib70f5PvVqYv5hPVAoGAA0lx8Aer9/Xgi9c+tWCu\nTVLVkKpyuFtRx/M7is0zsYV4SZEJ0Q//rfX4cFhSwkcf03iPVNs1umE7R3Pbslx4\nA3X7wq/ioqD4oG8tx3urVN61wjRuYvbcIN2osFEqG3JsNcWoWL+ZRl3auIVaAlgk\ntQSLMH7fsrI6mwrS0FbIUxM=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-rf954@borhan-33e53.iam.gserviceaccount.com",
    client_id: "104461572710667083825",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    storageBucket:"gs://borhan-33e53.appspot.com",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rf954%40borhan-33e53.iam.gserviceaccount.com"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
export default storage;
  