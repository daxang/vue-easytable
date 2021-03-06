/*
 * 排序
 * */
export default {
    methods: {
        // 是否允许排序
        enableSort(val){
            return typeof val === 'string' ? true : false;
        },
        // 允许排序的列集合
        sortColumns(){
            var self = this, sortColumns = {},
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;

            collection.filter(function (item, index) {
                if (self.enableSort(item.orderBy)) {
                    sortColumns[item.field] = item.orderBy;
                }
            })

            return sortColumns;
        },

        // 排序控制
        sortControl(field, orderBy){

            var self = this,
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;

            if (self.enableSort(orderBy)) {
                collection.filter(function (column, index) {

                    if (self.enableSort(column.orderBy) && column.field === field) {

                        if (self.sortAlways) {

                            column.orderBy = column.orderBy === 'asc' ? 'desc' : 'asc';
                        } else {

                            column.orderBy = column.orderBy === 'asc' ? 'desc' :
                                (column.orderBy === 'desc' ? '' : 'asc');
                        }
                    }

                    if (!self.multipleSort) {
                        if (column.field !== field && self.enableSort(column.orderBy)) {
                            column.orderBy = '';
                        }
                    }
                })

                self.$emit('sort-change', self.sortColumns());
            }
        },
        // 只允许保留第一个排序规则（‘asc’或者‘desc’）
        singelSortInit(){
            var self = this,
                result = false,
                collection;
            if (!self.multipleSort) {
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;
                collection.filter(function (item, index) {
                    if (self.enableSort(item.orderBy) && item.orderBy !== '') {
                        if (result) {
                            item.orderBy = '';
                        }
                        result = true;
                    }
                })
            }
        }
    }
}