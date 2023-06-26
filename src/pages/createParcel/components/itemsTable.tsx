import { Button, Table } from 'antd';
import * as React from 'react';
import { columns } from './itemsTableCollumns';
import { IEditableParcelState, editParcel } from '../../../store/modules/editableEntities/editableParcel';
import { useDispatch } from 'react-redux';


export const ItemsTable = ({data}: {data: IEditableParcelState}) => {

    const dispatch = useDispatch()

    const handleAddItem = React.useCallback(() => {
        dispatch(editParcel.addItem())
      }, [])

    return (
        <>
            <Table
                columns={columns()}
                rowClassName={() => 'editable-row'}
                dataSource={data.items.map((item, index) => ({ ...item, key: index }))}
                bordered
                size="middle"
                pagination={false}
            />
            <Button
                onClick={handleAddItem}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Добавить груз
            </Button>
        </>
    )
}