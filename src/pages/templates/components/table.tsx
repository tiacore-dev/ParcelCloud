import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../store/modules';
import { Input, Table } from 'antd';
import { templatesDesktopColumns } from './desktop.columns';
import { setTemplatesFilterName } from '../../../store/modules/settings/templates';

interface TemplatesTableProps {
    search?: boolean
    onRowClick: (id: string) => void
}

export const TemplatesTable = (props: TemplatesTableProps) => {

    
    const { search, onRowClick } = props
    const templatesData = useSelector((state: IState) => state.pages.templates.data)
    const isLoading = useSelector((state: IState) => state.pages.templates.loading)
    const filters = useSelector((state: IState) => state.settings.templatesSettings.filters)
    const templates = templatesData.map(template => ({ ...template, key: template.id }))
    const filtredTemplates = templates.filter((template) => {
        if (filters.name === "") {
            return true
        }
        const filterName = filters.name.toUpperCase()

        if (template.name?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        if (template.address?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        if (template.company?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        if (template.addInfo?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        if (template.person?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        if (template.city?.toUpperCase().indexOf(filterName) > -1) {
            return true
        }
        return false
    })
    const dispatch = useDispatch();


    return <>
        {(!isLoading) && search && (
            <Input
            style={{marginBottom: 12}}
                value={filters.name}
                placeholder='Поиск'
                onChange={(e) => dispatch(setTemplatesFilterName(e.target.value))}
            />
        )}
        {!isLoading && (
            <Table
                dataSource={filtredTemplates}
                columns={templatesDesktopColumns}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => { onRowClick(record.id) }
                    };
                }}
            />)}
    </>

}