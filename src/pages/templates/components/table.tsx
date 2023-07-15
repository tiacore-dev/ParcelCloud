import * as React from 'react';

import { useSelector } from 'react-redux';
import { IState } from '../../../store/modules';
import { Table } from 'antd';
import { templatesDesktopColumns } from './desktop.columns';

interface TemplatesTableProps {
    onRowClick: (id: string) => void
}

export const TemplatesTable = (props: TemplatesTableProps) => {

    const { onRowClick } = props
    const templatesData = useSelector((state: IState) => state.pages.templates.data)
    const isLoading = useSelector((state: IState) => state.pages.templates.loading)

    return isLoading ? <></> :
        <Table
            dataSource={templatesData.map(template => ({ ...template, key: template.id }))}
            columns={templatesDesktopColumns}
            onRow={(record) => {
                return {
                    onClick: () => { onRowClick(record.id) }
                };
            }}
        />

}