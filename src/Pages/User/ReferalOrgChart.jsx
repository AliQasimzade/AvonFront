
import React, { useState, useEffect } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { getMyAccount } from '../../services/getRequests';
import { useSelector } from 'react-redux';

function formatData(data) {
    const formattedData = data.map((item) => {
        const children = item.referalTeam ? formatData(item.referalTeam) : [];
        const formattedItem = {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500 text-body',
            style: { borderRadius: '12px' },
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: item.name,
                title: item.referalId,
            },
            children: [
                ...children,
                ...(item.referalTeam
                    ? [
                        {
                            label: 'Parent Referal ID',
                            className: 'bg-indigo-500 text-body',
                            style: { borderRadius: '12px' },
                            data: {
                                image: '',
                                name: item.referalId,
                                title: item.referalId,
                            },
                        },
                    ]
                    : []),
                ...(item.parentReferalId
                    ? [
                        {
                            label: 'Parent Referal ID',
                            className: 'bg-indigo-500 text-body',
                            style: { borderRadius: '12px' },
                            data: {
                                image: '',
                                name: item.parentReferalId,
                                title: item.parentReferalId,
                            },
                        },
                    ]
                    : []),
            ],
        };
        return formattedItem;
    });
    return formattedData;
}




export default function ReferalOrgChart() {
    const userAccountInfo = useSelector(
        (state) => state.persistedReducer.Accont.user
    );
    const [myData, setMyData] = useState([]);

    const dummy = [
        {
            id: 1,
            referalId: 'AB12',
            name: "John",
            referalTeam: [
                {
                    id: 2,
                    parentReferalId: 'AB12',
                    referalId: 'DD123',
                    name: "John 2",
                    referalTeam: [
                        {
                            id: 8,
                            parentReferalId: 'DD123',
                            referalId: 'EE123',
                            name: "John 2",
                        },
                        {
                            id: 9,
                            parentReferalId: 'DD123',
                            referalId: 'EE124',
                            name: "John 2",
                        },
                        {
                            id: 10,
                            parentReferalId: 'DD123',
                            referalId: 'EE125',
                            name: "John 2",
                        },

                    ]
                },
                {
                    id: 3,
                    parentReferalId: 'AB12',
                    referalId: 'DD124',
                    name: "John 2",
                    referalTeam: [
                        {
                            id: 11,
                            parentReferalId: 'DD124',
                            referalId: 'ff123',
                            name: "John 2",
                        },
                        {
                            id: 12,
                            parentReferalId: 'DD123',
                            referalId: 'ff124',
                            name: "John 2",
                        },
                        {
                            id: 13,
                            parentReferalId: 'DD123',
                            referalId: 'ff125',
                            name: "John 2",
                        },

                    ]
                },
                {
                    id: 4,
                    parentReferalId: 'AB12',
                    referalId: 'DD125',
                    name: "John 2",
                    referalTeam: [
                        {
                            id: 5,
                            parentReferalId: 'DD125',
                            referalId: 'HG123',
                            name: "John 2",
                        },
                        {
                            id: 6,
                            parentReferalId: 'DD123',
                            referalId: 'HG124',
                            name: "John 2",
                        },
                        {
                            id: 7,
                            parentReferalId: 'DD123',
                            referalId: 'HG125',
                            name: "John 2",
                        },

                    ]
                },

            ]
        }
    ]

    const fetchData = async () => {
        try {
            const req = await getMyAccount(userAccountInfo.id);
            setMyData([req])
            
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    console.log(myData);
    console.log(dummy)
    const formattedData = formatData(dummy);
    console.log(formattedData);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column align-items-center">
                        <img alt={node.data.name} src={node.data.image} className="mb-3" style={{ width: '3rem', height: '3rem' }} />
                        <span className="fw-bold mb-2 text-body">{node.data.name}</span>
                        <span className='text-body'>{node.data.title}</span>
                    </div>
                </div>
            );
        }

        return node.label;
    };

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={formattedData} nodeTemplate={nodeTemplate} />
        </div>
    )
}
