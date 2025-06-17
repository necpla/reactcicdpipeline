pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "necpla/reactcicdpipeline"
        CONTAINER_NAME = "reactcicdpipeline"
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

        stage('Deploy to Environment') {
            steps {
                script {
                  

                    // Use triple double-quotes for string interpolation in sh block
                    sh """
                    docker stop ${CONTAINER_NAME} || echo Not running
                    docker rm ${CONTAINER_NAME} || echo Not found
                    docker run -d -p 3000:80 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "'${env.BRANCH_NAME}' branch pipeline completed successfully."
        }
        failure {
            echo "'${env.BRANCH_NAME}' branch pipeline failed."
        }
    }
}
