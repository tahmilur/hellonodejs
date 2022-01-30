exports.getYesterday = function () {
    var d = new Date(); // Today!
    d.setDate(d.getDate() - 1); // Yesterday!    
    return d;
};

exports.getToday = function () {
    return Date();
};

exports.getHelloWorld = function () {
    return 'Welcome to hello world';
};