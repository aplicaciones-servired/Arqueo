pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_SERVER_ARQUEO = credentials('ENV_SERVER_ARQUEO')
    ENV_SERVER_CLIENT = credentials('ENV_SERVER_CLIENT')
    
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_server = readFile(ENV_SERVER_ARQUEO)
            def env_client = readFile(ENV_SERVER_CLIENT)
            writeFile file: './server/.env', text: env_server
            writeFile file: './client/.env', text: env_client
          }
        }
      }

      stage('install dependencies server') {
        steps {
          script {
            sh 'cd ./server && yarn'
          }
        }
      }

      stage('install dependencies client') {
        steps {
          script {
            sh 'cd ./client && yarn'
            sh 'cd ./client && yarn build'
          }
        }
      }

      stage('down docker compose'){
        steps {
          script {
            sh 'docker compose down'
          }
        }
      }

      stage('delete images server'){
        steps{
          script {
          def images = 'arqueo-server'
            if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
              sh "docker rmi ${images}"
            } else {
              echo "Image ${images} does not exist."
              echo "continuing... executing next steps"
            }
          }
        }
      }
    
      stage('run docker compose'){
        steps {
          script {
            sh 'docker compose up -d'
            }
          }
      }
    }
}