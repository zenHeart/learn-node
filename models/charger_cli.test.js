var cli = require('../../bin/option_process');
var moment = require('moment');

var expect = require('chai').expect;


describe('test parseRelative', function () {
    var testData = {
        positiveHour: '2h',
        negativeHour: '-12h',
        errorTime: '-12k'
    };

    it('test positive hour', function () {
        var result = cli.parseRelative(testData.positiveHour);
        console.log(result);
        expect(result).to.be.an.instanceof(moment);
    });


    it('test negative hour', function () {
        var result = cli.parseRelative(testData.negativeHour);
        console.log(result);
        expect(result).to.be.an.instanceof(moment);
    });

    it('test error relative time', function () {
        try {
            var result = cli.parseRelative(testData.errorTime);
            console.log(result);
        } catch (e) {
            expect(e).to.be.an.instanceof(Error);
        }
    });
});

describe('test parseFormat', function () {
    var testData = {
        time: '12:23',
        dayTime: '6.7 12:43:21',
        errorTime: '-12h'
    };

    it('test only timem', function () {
        var result = cli.parseFormat(testData.time);
        console.log(result);
        expect(result).to.be.an.instanceof(moment);
    });


    it('test day and time', function () {
        var result = cli.parseFormat(testData.dayTime);
        console.log(result);
        expect(result).to.be.an.instanceof(moment);
    });

    //todo 注意 moment 只提取有用的字符,而不是检查整个字符串
    it('test error time', function () {
        var result = cli.parseFormat(testData.errorTime);
        console.log(result);
        expect(result).to.be.an.instanceof(moment);
        expect(result.isValid()).to.be.true;
    });
});

describe('test convertDate', function () {
    var testData = {
        time: '12:23',
        dayTime: '6.7 12:43:21',
        errorTime: '-12h'
    };

    it('test only timem', function () {
        var result = cli.convertDate(cli.parseFormat(testData.time));
        console.log(result);
        expect(result).to.be.finite;
    });


    it('test day and time', function () {
        var result = cli.convertDate(cli.parseFormat(testData.dayTime));
        console.log(result);
        expect(result).to.be.finite;
    });

    //todo 注意 moment 只提取有用的字符,而不是检查整个字符串
    it('test error time', function () {
        var result = cli.convertDate(cli.parseFormat(testData.errorTime));
        console.log(result);
        expect(result).to.be.finite;
    });
});

describe('test getTimestamp', function () {
    var testData = {
        relativeFormat: '-12h',
        time: '12:00',
        dayTime: '6.7 12:43:21',
        errorTime: 'dsfdsf'
    };

    it('test relativeFormat', function () {
        var result = cli.getTimestamp(testData.relativeFormat);
        console.log(result);
        expect(result).to.be.an.finit;
    });

    it('test time', function () {
        var result = cli.getTimestamp(testData.time);
        console.log(result);
        expect(result).to.be.an.finit;

    });


    it('test day and time', function () {
        var result = cli.getTimestamp(testData.dayTime);
        console.log(result);
        expect(result).to.be.an.finit;

    });

    it('test error time', function () {
        try {
            var result = cli.getTimestamp(testData.errorTime);
            console.log(result);
        } catch (e) {

            expect(e).to.be.an.instanceof(Error);
        }


    });
});