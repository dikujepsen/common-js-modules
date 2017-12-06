from fabric.api import local, prefix
from fabric.context_managers import cd, lcd
import os


activate_env_string = "source env/bin/activate"

def activate_env():
    local(activate_env_string)

def git_pull():
    "Updates the repository."
    local("git pull")

def compile_webpack():
    "Updates static files"
    local("./node_modules/.bin/webpack --config webpack.prod.config.js")

def npm_install():
    local("npm install")


def update_local():
    "Update the local server"
    git_pull()
    npm_install()
    compile_webpack()

