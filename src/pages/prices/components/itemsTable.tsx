import { Button, Table } from 'antd';
import * as React from 'react';
import { columns } from './itemsTableCollumns';
import { useDispatch } from 'react-redux';
import { IPricesState, editPrices } from '../../../store/modules/pages/prices';
import { isMobile } from '../../../utils/isMobile';


export const ItemsTable = ({ data }: { data: IPricesState }) => {

    const dispatch = useDispatch()

    const handleAddItem = React.useCallback(() => {
        dispatch(editPrices.addItem())
    }, [])

    return (
        <>
            <Table
                showHeader={!isMobile()}
                columns={columns()}
                rowClassName={() => 'editable-row'}
                dataSource={data.items.map((item, index) => ({ ...item, key: index }))}
                bordered
                size="small"
                pagination={false}
            />
            <Button

                onClick={handleAddItem}
                type="primary"
                style={{
                    marginTop: 16,
                }}
            >
                Добавить груз
            </Button>

        </>
    )
}