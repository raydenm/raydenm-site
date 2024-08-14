### 以stack模块为例:

1. 更新stack文件夹图片
2. https://www.iloveimg.com/zh-cn/resize-image#resize-options,pixels 调整大小
3. https://code-nav.top/spritesmith 生成雪碧图
4. 根据结果css替换 style/sprite.css
5. 雪碧图通过 https://tinypng.com/ 优化后替换sprite.png
6. 更新配置文件 lib/constants.ts STACK_LIST
7. 使用查看效果
