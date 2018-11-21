import 'mocha'
import { expect } from 'chai'

const Is = require('@careteen/is')
import Match from '../src/index'

describe('Match', () => {
  it('simple object', () => {
    let preData = {
      name: 'careteen',
      age: 22
    }
    let expectData = {
      realName: 'careteen',
      realAge: 22
    }
    let actualData = Match(preData, {
      'realName': '{{name}}',
      'realAge': '{{age}}'
    })
    expect(Is.isEqual(actualData, expectData)).to.equal(true)
  })

  it('simple array', () => {
    let preData = [{
      name: 'careteen',
      age: 22      
    }, {
      name: 'lanlan',
      age: 22      
    }]
    let expectData = [{
      realName: 'careteen',
      realAge: 22      
    }, {
      realName: 'lanlan',
      realAge: 22      
    }]
    let actualData = Match(preData, {
      'realName': '{{name}}',
      'realAge': '{{age}}'
    })
    expect(Is.isEqual(actualData, expectData)).to.equal(true)
  })  

  it('fill object', () => {
    let preData = {
      name: 'careteen',
      age: 22
    }
    let expectData = {
      name: 'careteen',
      age: 22,
      realName: 'careteen',
      realAge: 22
    }
    let actualData = Match(preData, {
      'realName': '{{name}}',
      'realAge': '{{age}}'
    }, {
      fill: true
    })
    expect(Is.isEqual(actualData, expectData)).to.equal(true)
  })  

  it('filter object null or empty prop', () => {
    let preData = {
      name: 'careteen',
      age: 22,
      sex: '',
      eat: null,
      shopping: undefined
    }
    let expectData = {
      realName: 'careteen',
      realAge: 22
    }
    let actualData = Match(preData, {
      'realName': '{{name}}',
      'realAge': '{{age}}',
      'realSex': '{{sex}}',
      'realEat': '{{eat}}',
      'realShopping': '{{shopping}}'
    }, {
      filter: [null, '', undefined]
    })
    expect(Is.isEqual(actualData, expectData)).to.equal(true)
  })   

  it('object custom prop', () => {
    let preData = {
      name: 'careteen',
      age: 22
    }
    let expectData = {
      realName: 'careteen.Wang',
      realAge: 22
    }
    let actualData = Match(preData, {
      'realName': $scope => {
        return `${$scope.name}.Wang` 
      },
      'realAge': '{{age}}'
    })
    expect(Is.isEqual(actualData, expectData)).to.equal(true)
  })  
})