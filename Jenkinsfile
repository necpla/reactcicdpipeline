pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "necpla/reactcicdpipeline:${env.BRANCH_NAME}"
        CONTAINER_NAME = "reactcicdpipeline-${env.BRANCH_NAME}"
        PORT = "${env.BRANCH_NAME == 'main' ? '3000' : '3001'}" // prod:3000, staging:3001
    }

    tools {
        nodejs 'NodeJS_20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Deploy to Environment') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                }
            }
            steps {
                echo "🔁 Deploying branch '${env.BRANCH_NAME}' to ${env.BRANCH_NAME == 'main' ? 'Production' : 'Staging'}"

                bat """
                    docker stop ${CONTAINER_NAME} || echo Not running
                    docker rm ${CONTAINER_NAME} || echo Not found
                    docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "✅ '${env.BRANCH_NAME}' branch pipeline completed successfully."
        }
        failure {
            echo "❌ '${env.BRANCH_NAME}' branch pipeline failed."
        }
    }
}
