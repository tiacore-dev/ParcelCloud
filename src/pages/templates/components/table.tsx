import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../store/modules';
import { Input, Table } from 'antd';
import { templatesDesktopColumns } from './desktop.columns';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import type { DragEndEvent } from '@dnd-kit/core';
import { setTemplatesFilterName } from '../../../store/modules/settings/templates';
import { DndContext } from '@dnd-kit/core';
import { MenuOutlined } from '@ant-design/icons';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getTemplatesFailure, getTemplatesSuccess } from '../../../store/modules/pages/templates';
import { useApi } from '../../../hooks/useApi';
import { ITemplate } from '../../../interfaces/templates/ITemplate';
import { IauthToken, authToken } from '../../../hooks/useAuth';
import { isMobile } from '../../../utils/isMobile';
import { templatesMobileColumns } from './mobile.columns';

interface TemplatesTableProps {
    search?: boolean
    sort?: boolean
    onRowClick: (id: string) => void
}

interface setTemplatesKeyDto {
    authToken: IauthToken,
    activeId: string,
    overId: string,
}

export const TemplatesTable = (props: TemplatesTableProps) => {


    const { search, sort, onRowClick } = props
    const templates = useSelector((state: IState) => state.pages.templates.data)
    const isLoading = useSelector((state: IState) => state.pages.templates.loading)
    const filters = useSelector((state: IState) => state.settings.templatesSettings.filters)
    const token = authToken()

    const templatesColumns = isMobile() ? templatesMobileColumns : templatesDesktopColumns
    const columns = sort ? [{key: 'sort'}, ...templatesColumns] : templatesColumns
    

    const setTemplatesKey = React.useCallback((param: setTemplatesKeyDto) => {
        useApi<ITemplate[], setTemplatesKeyDto>('templatesKey', 'set', param).then((templates) => {
            dispatch(getTemplatesSuccess(templates))
        }).catch(err => {
            dispatch(getTemplatesFailure(err))
        })
    }, [])
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

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (over && active.id !== over.id) {

            const activeIndex = templates.findIndex((i) => i.key === active.id);
            const overIndex = templates.findIndex((i) => i.key === over.id);
            const movedTemplate = arrayMove(templates, activeIndex, overIndex).map(template => {
                if (template.key === over.id) {
                    return { ...template, key: active.id.valueOf() as number }
                }
                if (template.key === active.id) {
                    return { ...template, key: over.id.valueOf() as number }
                }
                return template
            })

            dispatch(getTemplatesSuccess(movedTemplate))
            setTemplatesKey({
                authToken: token,
                activeId: templates[activeIndex].id,
                overId: templates[overIndex].id
            })
        }
    };

    interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
        'data-row-key': string;
    }

    const Row = ({ children, ...props }: RowProps) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            setActivatorNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({
            id: props['data-row-key'],
        });

        const style: React.CSSProperties = {
            ...props.style,

            transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
            transition,
            ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
        };

        return (
            <tr {...props} ref={setNodeRef} style={style} {...attributes}>
                {React.Children.map(children, (child) => {
                    if ((child as React.ReactElement).key === 'sort') {
                        return React.cloneElement(child as React.ReactElement, {
                            children: (
                                <MenuOutlined
                                    ref={setActivatorNodeRef}
                                    style={{ touchAction: 'none', cursor: 'move' }}
                                    {...listeners}
                                />
                            ),
                        });
                    }
                    return child;
                })}
            </tr>
        );
    };



    return <>
        {(!isLoading) && search && (
            <Input
                style={{ marginBottom: 12 }}
                value={filters.name}
                placeholder='Поиск'
                onChange={(e) => dispatch(setTemplatesFilterName(e.target.value))}
            />
        )}
        {!isLoading && (

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={filtredTemplates.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        
                        dataSource={filtredTemplates}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                        onRow={(record) => {
                            return {
                                onClick: () => { onRowClick(record.id) }
                            };
                        }}
                    />
                </SortableContext>
            </DndContext>


        )}
    </>

}