pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "necpla/reactcicdpipeline-${env.BRANCH_NAME}"
        CONTAINER_NAME = "reactcicdpipeline-${env.BRANCH_NAME}"
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

        stage('Test React App') {
            steps {
                bat 'CI=true npm test'
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
                    def PORT = (env.BRANCH_NAME == 'master') ? '3000' : '3001'
                    def ENV_NAME = (env.BRANCH_NAME == 'master') ? 'Production' : 'Staging'

                    echo "🔁 Deploying branch '${env.BRANCH_NAME}' to ${ENV_NAME}"

                    // Use triple double-quotes for string interpolation in bat block
                    bat """
                    docker stop ${CONTAINER_NAME} || echo Not running
                    docker rm ${CONTAINER_NAME} || echo Not found
                    docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
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
