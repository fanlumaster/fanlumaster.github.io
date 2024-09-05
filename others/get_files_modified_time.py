import os
import datetime

def list_files_with_modtime():
    # 获取当前目录
    current_dir = os.getcwd()
    
    # 遍历当前目录中的所有文件
    for filename in os.listdir(current_dir):
        # 构建完整的文件路径
        file_path = os.path.join(current_dir, filename)
        
        # 如果是文件（不是目录）
        if os.path.isfile(file_path):
            # 获取文件的修改时间
            mod_time = os.path.getmtime(file_path)
            
            # 将时间戳转换为可读格式
            mod_time_str = datetime.datetime.fromtimestamp(mod_time).strftime('%Y-%m-%d %H:%M:%S')
            
            # 打印文件名和修改时间
            print(f"{filename} - Last modified: {mod_time_str}")
if __name__ == "__main__":
    list_files_with_modtime()
