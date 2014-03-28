
Exec { path => '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin' }

#Message of the day file
file { '/etc/motd':
    content => "Welcome to Evventbox Vagrant-built virtual machine Managed by Puppet.\n"
}

class apt {
    exec { 'apt-get update':
        timeout => 0
    }
}

class git {
    package { 'git-core':
        ensure => latest,
        require => Class['apt']
    }
}

class grunt {
    package { 'grunt':
        provider => 'npm',
        require => Class['nodejs', 'git']
    }
    package { 'grunt-cli':
        provider => 'npm',
        require => Class['nodejs', 'git']
    }
}

class yeoman {
    package { 'yo':
        ensure => present,
        provider => 'npm',
        require => Class["nodejs"]
    }
    package { 'generator-jquery-mobile':
        ensure => installed,
        provider => 'npm',
        require  =>  Package["yo"]
    }
    package { 'generator-backbone':
        ensure => installed,
        provider => 'npm',
        require  =>  Package["yo"]
    }
}

class bower {
    package { 'bower':
        provider => 'npm',
        require => Class['nodejs', 'git']
    }
}

class dev {
    package { 'vim':
        require => Class['apt']
    }
}


include apt
include nodejs
include git
include grunt
include yeoman
include bower
include dev
