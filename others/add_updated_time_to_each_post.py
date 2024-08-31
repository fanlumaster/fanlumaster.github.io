import os
import re
from datetime import datetime

def update_file_headers():
    # 获取当前目录
    current_dir = os.getcwd()
    
    # 遍历当前目录中的所有文件
    for filename in os.listdir(current_dir):
        file_path = os.path.join(current_dir, filename)
        
        # 如果是文件（不是目录）
        if os.path.isfile(file_path):
            with open(file_path, 'r+', encoding='utf-8') as file:
                content = file.read()
                
                # 检查文件是否有正确的头部格式
                if content.startswith('---') and 'date:' in content:
                    # 检查是否已经有 updated 行
                    if 'updated:' not in content:
                        # 获取文件的修改时间
                        mod_time = os.path.getmtime(file_path)
                        mod_time_str = datetime.fromtimestamp(mod_time).strftime('%Y-%m-%d %H:%M:%S')
                        
                        # 在 date 行后插入 updated 行
                        new_content = re.sub(
                            r'(date: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})',
                            f'\\1\nupdated: {mod_time_str}',
                            content,
                            count=1
                        )
                        
                        # 将文件指针移到开头并写入新内容
                        file.seek(0)
                        file.write(new_content)
                        file.truncate()
                        
                        print(f"Updated file: {filename}")
                    else:
                        print(f"File already has 'updated' field: {filename}")
                else:
                    print(f"File does not have the correct header format: {filename}")

if __name__ == "__main__":
    update_file_headers()
