#### Project Setup

In order to spin up the project, in the root create .env with these two variables, with your own values.

MONGO_URI
JWT_SECRET

After that run this command

```bash
npm install && npm start
```



Documentation Pics
![image](https://user-images.githubusercontent.com/93830840/203552155-1506c015-0bf6-4eb6-85fc-bca63ee94285.png)




Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
