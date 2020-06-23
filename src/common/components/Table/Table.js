import * as React from 'react';
import './table.less';

export class Table extends React.Component {
    
    // возврат cell -> разметка header ячейки таблицы
    renderHeaderCell = (column, key) => {
        const {columns} = this.props;
        return (
            <div className="table-header-cell">
                <div className="table-header-cell__label">{column.label}</div>
            </div>
        );
    }
    
    // рендер каждой cell в header таблицы
    renderHeader = () => {
        const {columns} = this.props;
        return (
            <div className="table-header">
                {columns.map(this.renderHeaderCell)}
            </div>
        );
    }
    
    // рендер row таблицы с каждым пропс для cell
    renderRow = (row, key) => {
        const {columns, rowRenderer} = this.props;
        // если передан custom в свойство* 
        if (rowRenderer) {
            return rowRenderer(row, key);
        }
        return (
            <div className="table-row">
                {columns.map((column, key2) => {
                    return (
                        <div className="table-cell">
                            {row[column.key]}
                        </div>
                    );
                })}
            </div>
        );
    }

    // рендер body таблицы с каждой row внутри
    renderBody = () => {
        const {data} = this.props;
        return (
                <div className="table-body">
                    {data.map(this.renderRow)}
                </div>
            );
    }

    render() {
        return (
            <div className="table">
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }
}