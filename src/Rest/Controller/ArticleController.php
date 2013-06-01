<?php

namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\RouteResource;

use App\Document\Article;

/**
 * @RouteResource("Article")
 */
class ArticleController extends Controller
{
    public function cgetAction()
    {
        
    }

    /**
     * @View(SerializerGroups={"Editor"})
     * 
     * @param \App\Document\Article $article
     */
    public function getAction(Article $article)
    {
        return $article;
    }

    /**
     * @View
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function cpostAction(Request $request)
    {
        $title = trim($request->get('title'));
        if (empty($title)) {
            throw new HttpException(400, 'Article title id missing');
        }
        
        $article = new \App\Document\Article($title);
        $article->setText('Your text');
        $dm = $this->get('dm');
        $dm->persist($article);
        
        $dm->flush();
        
        return $article;
    }

    /**
     * 
     * @View
     * 
     * @param \Rest\Controller\Article $article
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \App\Document\Article
     * @throws HttpException
     */
    public function cputAction(Article $article, Request $request)
    {
        $fullContent = $request->get('content');
        
        if (empty($fullContent) || !array_key_exists('j-article-content', $fullContent)) {
            throw new HttpException(400, 'Article content missing');
        }
        
        $content = $fullContent['j-article-content'];
        
        $article->setContent($content);
        
        $dm = $this->get('dm');
        $dm->persist($article);
        
        $dm->flush();
        
        return $article;
    }
}
