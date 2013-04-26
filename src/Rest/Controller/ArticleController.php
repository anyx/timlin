<?php
namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;

/**
 * 
 */
class ArticleController extends Controller
{
    public function indexAction()
    {
        
    }

    /**
     * @View
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function newAction(Request $request)
    {
        $title = trim($request->get('title'));
        if (empty($title)) {
            throw new HttpException(400, 'Article title id missing');
        }
        
        $article = new \App\Document\Article($title);
        
        $dm = $this->get('dm');
        $dm->persist($article);
        
        $dm->flush();
        
        return $article;
    }
}
