'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link;

var List = React.createClass({
  getDefaultProps: function() {
    return {
      list: {},
      type: ''
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.props.list.content.toString().slice(0,200));
    return (
      <div className="article">
        <h2><Link to={this.props.type} params={{name: this.props.list.path}}>{this.props.list.title}</Link></h2>
        <span className="date">
            {this.props.list.date}
        </span>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <Link to={this.props.type} params={{name: this.props.list.path}}>浏览全文...</Link>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [ ReactRouter.State ],
  getInitialState: function() {
    return {
      data:    []
    };
  },
  componentDidMount: function() {
    this.getData(this.getParams().name);
  },
  componentWillReceiveProps: function() {
    this.getData(this.getParams().name);
  },
  componentDidUpdate: function(prevProps, prevState) {
    $(".post").toc();
  },
  getData: function(name) {
    var key,
        flag = 0,
        Store = [],
        url;
    switch (name) {
      case 'blog':
        url = 'dist/' +  name + '.json';
      case 'wiki':
        url = 'dist/' +  name + '.json';
    }
    $.get(url, function(data) {
      if (this.isMounted()) {
        if (!_.isObject(data)) {
          data = JSON.parse(data);
        }
        for (key in data) {
          (function() {
            var tmp = data[key];
            $.get(tmp.fullpath, function(content) {
              if (this.isMounted()) {
                flag++;
                tmp.content = content;
                Store.push(tmp);
                if (flag == data.length) {
                  this.setState({
                    data: Store
                  });
                }
              }
            }.bind(this));
          }.bind(this)());
        }
      }
    }.bind(this));
  },
  render: function () {
    var rawMarkup,
        type = this.getParams().name,
        listDom = this.state.data.map(function(list) {
          return <List list={list} type={type}/>;
        });
    return (
      <div className="container">
        <div className="post">
          {listDom}  
        </div>
        {/*
        <div className="list">
          <div className="list-container">
          </div>
        </div>
        */}
      </div>
    );
  }
});
