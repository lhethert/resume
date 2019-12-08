# Lachlan's resume
This page is built using [Jekyll](https://jekyllrb.com/) and uses the
[Modern Resume Theme](https://github.com/sproogen/modern-resume-theme/)
by [Sproogen](https://github.com/sproogen). Rather than forking the
entire project, it uses the _remote-theme_ setting in the \_config.yml
file to refer to the base project.

It is fairly similar to the main theme, with some minor changes such as
images for projects, alternative sass for quotes and the header,
addition of a skills and publications sections.

# Usage
It is not required to have Jekyll installed on the server onto which the
site is deployed, just the static files that are produced during a
build. To install Jekyll and its dependencies locally for build
purposes, follow the instructions [here](https://jekyllrb.com/). Note
that you will require Ruby > 2.4.2, which on OSX requires a bit of
dicking around:
```
# Install command line tools if you haven't
xcode-select --install

# Install Homebrew if you haven't
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install rbenv and ruby
brew install rbenv ruby-build
eval "$(rbenv init -)"
rbenv install 2.4.2
rbenv global 2.4.2
rbenv shell 2.4.2

# Install bundler and jekyll
gem install jekyll bundler
```

Assuming you have Jekyll installed locally, the following will build and
serve the site locally at [http://127.0.0.1:4000](http://127.0.0.1:4000):
```
$ bundle exec jekyll serve
```

To simply build and deploy, execute the following:
```
$ jekyll build
./deploy.sh
```
Of course, the deploy script will have to point to the relevant site
folder.

