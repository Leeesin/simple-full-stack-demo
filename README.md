我是一名前端工程师，之前大四实习的公司也是前后端分离的开发方式，平时的工作也只需要编写前端的代码。<br/>

对于后端我知之甚少，平时的开发过程中前端只需要将json传递给后端，其他事也就不用操心了。但我还是挺好奇数据是怎么被存到数据库这个过程的。
于是我利用业余时间简单学习了一下node和mongoDb，当然只限于最粗浅的增删改查，毕竟我的本职工作是前端嘛，我目前也没有深入学习后端的打算。综上所述，也就有了这个简单的demo。<br/>

这个demo没有什么高深的知识，不过对于初学者来理清前端和后端的数据交互我觉得还是有点帮助的（最起码对我自己是这样）。<br/>

一个最简单的流程基本上是这样的：<br/>
前端json =》node调用相关路由处理=》将前端的json格式化处理成业务需要的数据格式 =》调用数据库增删改查的Api =》存储 、查询、修改、删除数据 
