const projects = [
  {
    id: "p1",
    title: "Data Pipeline for Market Feeds",
    description:
      "Built an end-to-end ingest and processing pipeline using PySpark, Kafka, and S3 for near real-time analytics. Processed millions of records daily with alerting and S3 archival.",
    stack: ["PySpark", "Kafka", "AWS S3", "Python"],
    link: "https://github.com/example/data-pipeline",
  },
  {
    id: "p2",
    title: "Full-Stack Car Booking Platform",
    description:
      "A role-based MERN stack app with JWT authentication, booking workflows, and Stripe integration. Deployed with Render + MongoDB Atlas.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/example/car-booking",
  },
  {
    id: "p3",
    title: "ETL Automation Framework",
    description:
      "Developed a modular ETL orchestration layer using Airflow and PostgreSQL for automated data movement and transformation.",
    stack: ["Airflow", "PostgreSQL", "Docker"],
    link: "",
  },
  {
    id: "p4",
    title: "AI-Powered Trade Signal System",
    description:
      "Implemented LSTM-based models for stock movement prediction and built a dashboard for visualizing probabilistic trade signals.",
    stack: ["TensorFlow", "Flask", "Plotly", "AWS EC2"],
    link: "",
  },
];

export default projects;
