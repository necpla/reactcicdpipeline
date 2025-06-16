pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'necpla/reactcicdpipeline:latest'  
    }

    tools {
        nodejs 'NodeJS_20'  // Ensure this is defined in Jenkins global tools
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/necpla/reactcicdpipeline.git'  // Replace with your repo
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        // Optional: Run container locally for testing
        stage('Run Container (Optional)') {
            steps {
                script {
                    sh 'docker run -d -p 3000:80 --name reactcicdpipeline ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Dockerized React Counter App pipeline completed.'
        }
        failure {
            echo '❌ Something went wrong in the pipeline.'
        }
    }
}
