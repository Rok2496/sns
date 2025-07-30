# Render Deployment Instructions

## Environment Variables to Set in Render Dashboard

When deploying to Render, configure the following environment variables in your service settings:

### Database Configuration
```
DATABASE_URL=postgresql://sns_jim2_user:sbr25UOlBcHYQCdS0AQbg8qyhhtwPNIr@dpg-d24h0ejipnbc739tvjpg-a.oregon-postgres.render.com/sns_jim2
DB_HOST=dpg-d24h0ejipnbc739tvjpg-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=sns_jim2
DB_USER=sns_jim2_user
DB_PASSWORD=sbr25UOlBcHYQCdS0AQbg8qyhhtwPNIr
```

### Security Configuration
```
SECRET_KEY=q_yselNM7uIv7MlVLge47qbyW4TrL6IhSKiF_DyCzS61pw87ahAw8jg0NE9jG4170uyGF5EQTpAylwd97wBEcA
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Admin Configuration
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@snsbd.com
```

### Application Configuration
```
APP_NAME=SNS Backend API
APP_VERSION=1.0.0
DEBUG=False
```

## Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all the environment variables listed above
6. Deploy the service

## Important Notes

- Make sure to set `DEBUG=False` for production
- The `DATABASE_URL` should point to your Render PostgreSQL database
- Keep your `SECRET_KEY` secure and never commit it to version control