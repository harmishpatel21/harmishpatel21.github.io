export const data = {
    firstName: "Harmish",
    lastName: "Patel",
    headline: "Data Scientist who takes pride in building models that translate data points into business insights.",
    profilePic: "profilePic.png",
    linkedin: "https://www.linkedin.com/in/harmish2111patel/",
    github: "https://github.com/harmishpatel21",
};

const githubRepos = {
    knowYourData: "https://github.com/harmishpatel21/know-your-data",
    purchaseAmountPred: "https://github.com/harmishpatel21/Flask-Webapp-Purchase-Amount-Prediction",
    regressionAlgorithm: "https://github.com/harmishpatel21/Regression-Testing",
    bigQueryVisualizer: "https://github.com/harmishpatel21/Big-Query-Visualizer",
    amazonReviewPred: "https://github.com/harmishpatel21/Amazon-Review-Prediction",
    twitterSentimentAnalysis: "https://github.com/harmishpatel21/Twitter-sentiment-on-keywords",
    intentClassifier: "https://github.com/harmishpatel21/Intent-classifier-using-transformer",
};


export const skills = [
    {name: "Python"},
    {name: "Scala"},
    {name: "Java"},
    {name: 'C/C++'},
    {name: "Javascript"},
    {name: "R"},
    {name: "MySQL"},
    {name: "Postgres"},
    {name: "MongoDB"},
    {name: "Neo4J"},
    {name: "Hive"},
    {name: "Cassandra"},
    {name: "Google big query"},
    {name: "Apache Hadoop"},
    {name: "Apache Spark"},
    {name: "Apache Pig"},
    {name: "Apache Spark MLlib"},
    {name: "Pyspark"},
    {name: "Hbase"},
    {name: "Spark-streaming"},
    {name: "Tableau"},
    {name: "R Shiny"},
    {name: "Tensorflow"},
    {name: "Keras"},
    {name: "Pytorch"},
    {name: "Scikit-learn"},
    {name: "Pandas"},
    {name: "Numpy"},
    {name: "Flask"},
    {name: "Django"},
    {name: "Amazon Web Service"},
    {name: "Microsoft Azure"},
    {name: "Google Cloud Platform"},
    {name: "Docker"},
    {name: "Git"},
    {name: "JIRA"},
    
];

export const experience = [
    {
        title: "Data Science Intern",
        companyName: "University of Windsor",
        date: "Sep 2020 - Dec 2020",
        location: "Windsor, Canada",
        technology: "Python, Shell-Script, Flask, GitHub, PyTorch, Transformers, Deep learning, OCR",
        description: "",
    },
    {
        title: "Data Science Intern",
        companyName: "Embibe Indiavidiual Learning PVT. LTD.",
        date: "Dec 2018 - Apr 2019",
        location: "Bengaluru, India",
        technology: "Python, PySpark, Shell-Script, Atlassian BitBucket, Machine Learning, SVM, NLP, AWS",
        description: "",
    },
    {
        title: "Research & Development and Data Analytics Intern",
        companyName: "ValeurHR E-Solution",
        date: "May 2017 - Jun 2017",
        location: "Ahmedabad, India",
        technology: "Python, Flask, AngularJS, Time-series analysis, Machine learning",
        description: "",
    }

];

export const education = [
    {
        degree: "Masters",
        title: "Master of Applied Computing",
        specialization: "Artificial Intelligence",
        university: "University of Windsor",
        date: "Sep 2019 - Dec 2020",
        location: "Windsor, Canada",
        coursework: "Deep Learning for Computer Vision and NLP, Topics in Applied Artificial Intelligence",
    },
    {
        degree: "Bachelors of Technology",
        title: "Computer Science and Engineering",
        specialization: "Big Data and Analytics",
        university: "Ganpat University",
        date: "Aug 2015 - May 2019",
        location: "Ahmedabad, India",
        coursework: "Data Science and Data Modeling (Statistical Modelling), Machine Learning, Data Warehouse and Data Mining, Big Data Analytics, Business Intelligence",
    }
];

export const projects = [
    {
        imageURL: "know-your-data.png",
        title: "Know Your Data",
        description: "",
        technology: "Python, Streamlit, Sklearn, Pandas, Numpy, Hypothesis test, Data modelling, Data pre-processing",
        githubURL: githubRepos.knowYourData,
    },
    {  
        imageURL: "anomaly.png",
        title: "Anomaly Detection in Radiography Images",
        description: "",
        technology: "Python, Pytorch, DenseNet-169",
    },
    {  
        imageURL: "forecasting.png",
        title: "Purchase Amount Prediction",
        description: "Predicting the sales for next black friday",
        technology: "Python, Neural Network, XGBoost, PCA (Feature Selection), Flask",
        githubURL: githubRepos.purchaseAmountPred,
    },  
    {
        imageURL: "regression.png",
        title: "Regression Algorithm on Dataset",
        description: "A web-app to test the regression algorithm on custom dataset",
        technology: "R, Shiny Web App, Regression algorithms",
        githubURL: githubRepos.regressionAlgorithm,
    },
    {
        imageURL: "BigQuery.png",
        title: "Big Query Visualizer",
        description: "",
        technology: "ReactJS, Python, Flask, Google big query",
        githubURL: githubRepos.bigQueryVisualizer,
    },
    {
        imageURL: "intent.png",
        title: "Intent Classifier",
        description: "",
        technology: "Python, Pytorch, Transformer, Flask, Javascript",
        githubURL: githubRepos.intentClassifier,
    },
];


export const contactItems = [
    {
        href: data.linkedin,
        icon: "fa fa-linkedin",
        text: "LinkedIn",
    },
    {
        href: data.github,
        icon: "fa fa-github",
        text: "Github",
    }
];


