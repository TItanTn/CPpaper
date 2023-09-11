import Nav from '../components/Nav'
import PaperInfo from '../components/PaperInfo'
import { useState } from 'react'
import { useParams } from 'react-router'
import TransactionHistory from '../components/TransactionHistory'
import InputTransaction from '../components/InputTransaction'

const PaperPage = () => {
    const { Username, paperID } = useParams()

    return (
        <div className="paper-page-div">
            <Nav username={Username} />
            <section className='paper-page-body'>
                <PaperInfo />
                <section className='paper-page-transactions'>
                    <TransactionHistory user={Username} />
                </section>
            </section>
        </div>
    )
}

export default PaperPage