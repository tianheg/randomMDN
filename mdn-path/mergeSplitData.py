import os

def merge_txt_files(file_dir):
    merged_content = ""
    
    file_path = "/mnt/disk/repo/randomMDN/mdn-path/mergedData.txt"
    if os.path.exists(file_path):
      os.remove(file_path)
      print("文件已成功删除")
    else:
      print("文件不存在")

    print("开始合并 data.txt")

    for root, dirs, files in os.walk(file_dir):
        for file_name in files:
            if file_name.endswith('.txt'):
                file_path = os.path.join(root, file_name)
                with open(file_path, 'r') as f:
                    file_content = f.read()
                    merged_content += file_content

    with open('mergedData.txt', 'w') as f:
        f.write(merged_content)

merge_txt_files('/mnt/disk/repo/randomMDN/mdn-path')