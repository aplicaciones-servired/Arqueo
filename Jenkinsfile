pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_SERVER_ARQUEO = credentials('ENV_SERVER_ARQUEO')
    
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_server = readFile(ENV_SERVER_ARQUEO)
            writeFile file: './server/.env', text: env_server
           
          }
        }
      }

      stage('install dependencies server') {
        steps {
          script {
            sh 'cd ./server && yarn'
            sh 'cd ./server && yarn build'
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
      stage('delete images client'){
        steps{
          script {
          def images = 'arqueo-client'
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