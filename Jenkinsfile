pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'necpla/reactcicdpipeline:latest'
    }

    tools {
        nodejs 'NodeJS_20'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/necpla/reactcicdpipeline.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Run Container (Optional)') {
            steps {
                bat "docker run -d -p 3000:80 --name reactcicdpipeline ${DOCKER_IMAGE}"
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
