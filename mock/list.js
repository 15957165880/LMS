import list from './list.json'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';


const filePath = path.join(__dirname, '..', 'mock', 'list.json');


function updateJson(filePath, json) {
    const jsonData = JSON.stringify(json, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    return {
        code: 200,
        success: true,
        data: json,
    };
}
export default [
    {
        url: '/api/list/:type',
        method: 'post',
        response: ({ query, body }) => {
            const { type } = query

            // 读取文件内容（同步）
            const data = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(data);

            switch (type) {
                // 新增书籍
                case 'create': {
                    data.id = uuidv4() // 使用uuid来生成书籍id
                    json.push(data)
                    updateJson(filePath, json)
                }
                // 删除
                case 'delete': {
                    const { id } = body
                    json = json.filter(item => item.id != id)
                    updateJson(filePath, json)
                }
                // 更新库存
                case 'update': {
                    const { id, inventory } = body
                    json = json.map(item => {
                        if (item.id == id) {
                            item.inventory = inventory
                        }
                    });
                    updateJson(filePath, json)
                }
                // 借出
                case 'lend': {
                    const { id } = body
                    json = json.map(item => {
                        if (item.id == id) {
                            item.lended += 1
                        }
                    });
                    updateJson(filePath, json)
                }
                // 归还
                case 'return': {
                    const { id } = body
                    json = json.map(item => {
                        if (item.id == id) {
                            item.lended -= 1
                        }
                    });
                    updateJson(filePath, json)
                }
                // 查看已借书籍
                case 'view': {
                    json = json.filter(item => item.lended=true);
                    return {
                        code: 200,
                        success: true,
                        data: json
                    };
                }

                default:
                    return {
                        code: 200,
                        success: false,
                        data: list,
                    };
            }
        }
    },
];
