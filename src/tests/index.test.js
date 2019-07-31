import React from 'react'
import { configure, shallow }  from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import groupedBillables from './billables-grouped'

import App from '../containers/App'
import Uploader from '../components/Uploader'
import NoResults from '../components/NoResults'
import ResultItems from '../components/ResultItems'
import ResultItem from '../components/ResultItem'
import InvoiceDialog from '../components/InvoiceDialog';

/**
 * Testing Application rendering
 */
describe('App', () => {
    it('Renders without crashing', () => {
        shallow(<App debug />)
    })

    it('Contains 1 uploader', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Uploader)).to.have.lengthOf(1)
    })

    it('Starts with NoResults component', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(NoResults)).to.have.lengthOf(1)
    })
})

/**
 * Uploader tests
 */
describe('Component/Uploader', () => {
    it('Should render independently without crashing', () => {
        shallow(<Uploader />)
    })

    describe('Props test', () => {
        it('Should add "accept" prop to file picker', () => {
            let wrapper = shallow(
                <Uploader 
                    accept=".csv" />
            )

            expect(wrapper.find('input.upload__fileinput').filterWhere(input => {
                return input.prop('accept') === '.csv'
            })).to.have.lengthOf(1)
        })
    })

    describe('File inspection tests', () => {
        it('Should return true for general error if file size more than limit', () => {
            let wrapper = shallow(
                <Uploader />
            )

            wrapper.instance()._inspectFile({
                name: 'somefile.csv',
                size: 7000000,
            })

            const generalError = wrapper.state('generalError');

            expect(generalError).to.be.true
        })

        it('There should be a friendly error message if file size more than limit', () => {
            let wrapper = shallow(
                <Uploader />
            )

            wrapper.instance()._inspectFile({
                name: 'somefile.csv',
                size: 7000000,
            })

            expect(wrapper.state('uploadError')).to.not.be.null
        })

        it('Should return true for general error if file type invalid', () => {
            let wrapper = shallow(
                <Uploader accept=".csv" />
            )

            wrapper.instance()._inspectFile({
                name: 'somefile.pdf',
                size: 3000,
            })

            const generalError = wrapper.state('generalError');

            expect(generalError).to.be.true
        })

        it('There should be a friendly error message if file type invalid', () => {
            let wrapper = shallow(
                <Uploader accept=".csv" />
            )

            wrapper.instance()._inspectFile({
                name: 'somefile.pdf',
                size: 3000,
            })

            const generalError = wrapper.state('generalError');

            expect(wrapper.state('uploadError')).to.not.be.null
        })

        it('Should remove friendly errors if all is good', () => {
            let wrapper = shallow(
                <Uploader 
                    accept=".csv" />
            )

            wrapper.instance()._inspectFile({
                name: 'somefile.csv',
                size: 3000,
            }, false)

            expect(wrapper.state('uploadMessage')).to.be.null
        })
    })
})

/**
 * Result Items
 */
describe('Component/ResultItems', () => {
    it('Should contain two grouped projects with billables', () => {
        let wrapper = shallow(
            <ResultItems 
               projects={groupedBillables} />
        )

        expect(wrapper.find(ResultItem)).to.have.lengthOf(2)
    })
})

describe('Component/ResultItem', () => {
    it('Should contain the project name', () => {
        let wrapper = shallow(
            <ResultItem 
                project={groupedBillables[0]} />
        )
    
        expect(wrapper.contains('Google')).to.be.true
    })
})

describe('Component/InvoiceDialog', () => {
    it('Should render independently without crashing', () => {
        shallow(
            <InvoiceDialog 
                project={groupedBillables[0]} />
        )
    })
})