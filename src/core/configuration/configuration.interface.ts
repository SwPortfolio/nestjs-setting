export interface Configuration {
  node_env: string;

  server_port: number;

  database: {
    host: string;
    user: string;
    password: string;
    port: number;
    database: string;
    connectionLimit: number;
  };

  jwt: {
    access_secret: string;
    refresh_secret: string;
  };

  awsConfig: {
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    s3Region: string;
    s3Bucket: string;
  };
}
