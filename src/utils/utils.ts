interface EmailTemplateProps {
  Email: string;
  Message: string;
}

export const mailTemplate = ({ Email, Message }: EmailTemplateProps) => {
  return `
    <html>
      <head>
        <title>Contact Form Submission</title>
      </head>
      <body>
        <h1>Contact Form Submission from portfolio site</h1>
        <p style="color: green;">Email: ${Email}</p>
        <p style="color: blue;">Message: ${Message}</p>
      </body>
    </html>
    `;
};
