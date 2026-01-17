"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Flag,
  Clock,
  MapPin,
  Users,
  Home,
  Building,
  DollarSign,
  Send,
} from "lucide-react"
import { toast } from "react-toastify"
import { IconBrandWhatsapp } from "@tabler/icons-react"
import { createClient } from "@supabase/supabase-js"
import moment from "moment"
import Link from "next/link"

// Initialize Supabase client directly in the component
// This works with static exports since it runs entirely on the client
const supabaseUrl = "https://exdefxyldgjlcpjkpuor.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGVmeHlsZGdqbGNwamtwdW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzY3NTAsImV4cCI6MjAzNzIxMjc1MH0.0QOOrbyPdGemXYpv3dMMvsPD9QhJG-ig_FMhRrdJumk"
const WHATSAPP_COMMUNITY_LINK = "https://whatsapp.com/channel/0029VaEEN6V65yD8iCDaBv1m" //https://whatsapp.com/channel/0029VaEEN6V65yD8iCDaBv1m

export default function DiasporaForum() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [url, setUrl] = useState("")
  const [honey, setHoney] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [replyName, setReplyName] = useState("")
  const [replyEmail, setReplyEmail] = useState("")
  const [replyLoading, setReplyLoading] = useState(false)
  const [supabase, setSupabase] = useState(null)
  const [properties,setProperties] = useState([])
  const [updates,setUpdates] = useState([])

  // Initialize Supabase client when component mounts
  useEffect(() => {
    // Create Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    setSupabase(supabaseClient)

    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  const fetchProps = async () => {
    const {data,error} = await supabase
    .from("blogs")
    .select("*")
    .order('created_at', { ascending:false})
    .limit(4)
     data && setUpdates(data)
  
    const {data:projects,error:e} = await supabase
    .from("projects")
    .select("*")
    .eq("status","Under-Construction")
    .limit(4)
    .order('created_at', { ascending: false })
    properties && setProperties(projects)
  }

  // Fetch posts when the component mounts, when the active tab changes, or when supabase client is initialized
  useEffect(() => {
    if (supabase) {
      fetchPosts()
      fetchProps()
    }
  }, [activeTab, supabase])

  const fetchPosts = async () => {
    if (!supabase) return

    setFetchLoading(true)
    try {
      // Build query for posts
      let query = supabase.from("forum_posts").select("*").order("created_at", { ascending: false })

      // Filter by category if provided
      if (activeTab && activeTab !== "all") {
        query = query.eq("category", activeTab)
      }

      // Execute query
      const { data: postsData, error: postsError } = await query

      if (postsError) {
        console.error("Error fetching posts:", postsError)
        toast("Failed to load posts. Please try again.")
        return
      }

      // If no posts, set empty array
      if (!postsData || postsData.length === 0) {
        setPosts([])
        setFetchLoading(false)
        return
      }

      // Get all replies for these posts
      const { data: repliesData, error: repliesError } = await supabase
        .from("forum_replies")
        .select("*")
        .in(
          "post_id",
          postsData.map((post) => post.id),
        )
        .order("created_at", { ascending: true })

      if (repliesError) {
        console.error("Error fetching replies:", repliesError)
        toast("Failed to load replies. Please try again.")
      }

      // Format the response
      const formattedPosts = postsData.map((post) => {
        const postReplies = repliesData ? repliesData.filter((reply) => reply.post_id === post.id) : []
        return {
          id: post.id,
          author: post.author,
          authorRole: post.author_role,
          avatar: "/placeholder.svg?height=40&width=40",
          content: post.content,
          timestamp: formatTimestamp(post.created_at),
          likes: post.likes,
          category: post.category,
          replies: postReplies.map((reply) => ({
            id: reply.id,
            author: reply.author,
            authorRole: reply.author_role,
            avatar: "/placeholder.svg?height=32&width=32",
            content: reply.content,
            timestamp: formatTimestamp(reply.created_at),
          })),
        }
      })

      setPosts(formattedPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
      toast("Error loading posts. Please try again.")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault()

    if (!supabase) {
      toast("Connection to database not established. Please try again later.")
      return
    }

    if (!newPost.trim() || !name.trim() || !email.trim()) {
      toast("Please fill in all required fields")
      return
    }

    // Check honeypot field for spam prevention
    if (honey) {
      toast("Bot behavior detected")
      return
    }

    setLoading(true)

    try {
      // Insert post directly into Supabase
      const { data, error } = await supabase
        .from("forum_posts")
        .insert([
          {
            author: name,
            author_email: email,
            author_role: "Diaspora Investor",
            content: newPost,
            category: activeTab || "discussions",
            source_url: url || "",
          },
        ])
        .select()

      if (error) {
        console.error("Error creating post:", error)
        toast("Failed to submit post. Please try again.")
        return
      }

      // Add the new post to the local state
      const newPostObj = {
        id: data[0].id,
        author: data[0].author,
        authorRole: data[0].author_role,
        avatar: "/placeholder.svg?height=40&width=40",
        content: data[0].content,
        timestamp: "Just now",
        likes: 0,
        category: data[0].category,
        replies: [],
      }

      setPosts([newPostObj, ...posts])
      setNewPost("")
      toast("Post submitted successfully!")

      // Also send notification email using your existing endpoint
      try {
        await fetch("https://kingsdevelopersapi.co.ke/send-sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone: "", // Not required for forum posts
            message: `New forum post in ${activeTab} category: ${newPost}`,
            url,
            forumPost: true,
          }),
        })
      } catch (emailError) {
        console.error("Error sending notification email:", emailError)
        // Don't show toast for this as the post was still created successfully
      }
    } catch (error) {
      console.error(error)
      toast("Failed to submit post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    if (!supabase) return

    try {
      // Get current likes count
      const { data: post, error: getError } = await supabase
        .from("forum_posts")
        .select("likes")
        .eq("id", postId)
        .single()

      if (getError) {
        console.error("Error fetching post for like:", getError)
        return
      }

      // Optimistically update the UI
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)))

      // Increment likes count
      const { error } = await supabase
        .from("forum_posts")
        .update({ likes: (post.likes || 0) + 1 })
        .eq("id", postId)

      if (error) {
        console.error("Error liking post:", error)
        // Revert the optimistic update if the API call fails
        setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p)))
        toast("Failed to like post. Please try again.")
      }
    } catch (error) {
      console.error("Error liking post:", error)
      // Revert the optimistic update if the API call fails
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p)))
      toast("Failed to like post. Please try again.")
    }
  }

  const handleReplySubmit = async (postId) => {
    if (!supabase) return

    if (!replyText.trim() || !replyName.trim() || !replyEmail.trim()) {
      toast("Please fill in all required fields for your reply")
      return
    }

    // Check honeypot field for spam prevention
    if (honey) {
      toast("Bot behavior detected")
      return
    }

    setReplyLoading(true)

    try {
      // Insert reply directly into Supabase
      const { data, error } = await supabase
        .from("forum_replies")
        .insert([
          {
            post_id: postId,
            author: replyName,
            author_email: replyEmail,
            author_role: "Diaspora Investor",
            content: replyText,
          },
        ])
        .select()

      if (error) {
        console.error("Error creating reply:", error)
        toast("Failed to submit reply. Please try again.")
        return
      }

      // Add the new reply to the local state
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              replies: [
                ...post.replies,
                {
                  id: data[0].id,
                  author: data[0].author,
                  authorRole: data[0].author_role,
                  avatar: "/placeholder.svg?height=32&width=32",
                  content: data[0].content,
                  timestamp: "Just now",
                },
              ],
            }
          }
          return post
        }),
      )

      // Reset reply form
      setReplyText("")
      setReplyingTo(null)
      toast("Reply submitted successfully!")

      // Get the original post to notify the author
      const { data: postData, error: postError } = await supabase
        .from("forum_posts")
        .select("author, author_email, content")
        .eq("id", postId)
        .single()

      if (!postError && postData) {
        // Send notification email to the original post author using your existing endpoint
        try {
          await fetch("https://kingsdevelopersapi.co.ke/send-sales", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: postData.author,
              email: postData.author_email,
              phone: "", // Not required for forum replies
              message: `${replyName} replied to your post: "${postData.content.substring(0, 50)}..."\n\nReply: ${replyText}`,
              url,
              forumPost: true,
              forumReply: true,
            }),
          })
        } catch (emailError) {
          console.error("Error sending notification email:", emailError)
          // Don't show toast for this as the reply was still created successfully
        }
      }
    } catch (error) {
      console.error(error)
      toast("Failed to submit reply. Please try again.")
    } finally {
      setReplyLoading(false)
    }
  }

  // Helper function to format timestamps
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) {
      return "Just now"
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`
    } else if (diffDay < 30) {
      return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <div className="mb-10 text-start">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Kings Developers Diaspora Forum</h1>
        <p className="text-lg text-body-color max-w-3xl ">
          Connect with fellow Kenyan diaspora investors, share experiences, and get insights about real estate
          opportunities in Kenya.
        </p>
      </div>

      <div className="mb-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#25D366]/30 bg-[#e9f8ef] px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-[#25D366] p-3 text-white">
              <IconBrandWhatsapp size={32} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0b3a1d]">Real-time conversations</p>
              <h2 className="text-2xl font-bold text-[#0b3a1d]">Join the Diaspora WhatsApp Community</h2>
              <p className="text-sm text-[#0b3a1d]/80">
                Get live investment alerts, ask urgent questions, and meet vetted diaspora insiders on WhatsApp.
              </p>
            </div>
          </div>
          <Link href={WHATSAPP_COMMUNITY_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#1ebe57]">
              Join on WhatsApp
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="discussions" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="discussions" className="px-4">
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="investments" className="px-4">
                  Investments
                </TabsTrigger>
                <TabsTrigger value="properties" className="px-4">
                  Properties
                </TabsTrigger>
                <TabsTrigger value="questions" className="px-4">
                  Q&A
                </TabsTrigger>
              </TabsList>
            </div>

            <Card className="mb-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Create a Post</CardTitle>
                <CardDescription>Share your thoughts with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B]"
                        required
                      />
                      <input type="text" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" />
                    </div>
                  </div>
                  <Textarea
                    placeholder="What's on your mind about Kenyan real estate?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[120px] mb-4"
                    required
                  />
                  <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white">
                    {loading ? "Posting..." : "Post to Forum"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {fetchLoading ? (
              <Card className="mb-6">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">Loading posts...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <TabsContent value="discussions" className="mt-0">
                  {renderPosts(
                    posts.filter((post) => post.category === "discussions" || !post.category),
                    handleLike,
                    replyingTo,
                    setReplyingTo,
                    replyText,
                    setReplyText,
                    replyName,
                    setReplyName,
                    replyEmail,
                    setReplyEmail,
                    handleReplySubmit,
                    replyLoading,
                  )}
                </TabsContent>

                <TabsContent value="investments" className="mt-0">
                  {renderPosts(
                    posts.filter((post) => post.category === "investments"),
                    handleLike,
                    replyingTo,
                    setReplyingTo,
                    replyText,
                    setReplyText,
                    replyName,
                    setReplyName,
                    replyEmail,
                    setReplyEmail,
                    handleReplySubmit,
                    replyLoading,
                  )}
                </TabsContent>

                <TabsContent value="properties" className="mt-0">
                  {renderPosts(
                    posts.filter((post) => post.category === "properties"),
                    handleLike,
                    replyingTo,
                    setReplyingTo,
                    replyText,
                    setReplyText,
                    replyName,
                    setReplyName,
                    replyEmail,
                    setReplyEmail,
                    handleReplySubmit,
                    replyLoading,
                  )}
                </TabsContent>

                <TabsContent value="questions" className="mt-0">
                  {renderPosts(
                    posts.filter((post) => post.category === "questions"),
                    handleLike,
                    replyingTo,
                    setReplyingTo,
                    replyText,
                    setReplyText,
                    replyName,
                    setReplyName,
                    replyEmail,
                    setReplyEmail,
                    handleReplySubmit,
                    replyLoading,
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">• Be respectful to fellow community members</p>
              <p className="text-sm">• Share authentic experiences and insights</p>
              <p className="text-sm">• Keep discussions focused on Kenyan real estate</p>
              <p className="text-sm">• No promotional content without approval</p>
              <p className="text-sm">• Report inappropriate content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
             {
              updates && updates.map( update => (
                <div key={update.id} className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <Link href={`/blog-page/${update?.name?.replace(/,?\s+/g, '-').toLowerCase()}_${update?.id}`} >
                  
                  <h4 className="font-medium">{update.name}</h4>
                  <p className="text-sm text-muted-foreground">{moment(update.created_at).fromNow()}</p>
                </Link>
              </div>
              ) )
             }
             
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {
              properties && properties.map( update => (
                <div key={update.id} className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <Link href={`/project/${update?.name.replace(/,?\s+/g, '-').toLowerCase()}_${update?.id}`} >
                  
                  <h4 className="font-medium">{update.name}</h4>
                  <p className="text-sm text-muted-foreground">{update.location}</p>
                </Link>
              </div>
              ) )
             }
                <Link href="/projects" >
              <Button variant="outline" className="w-full mt-2">
                View All Properties
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Update the renderPosts function to include reply functionality
function renderPosts(
  posts,
  handleLike,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  replyName,
  setReplyName,
  replyEmail,
  setReplyEmail,
  handleReplySubmit,
  replyLoading,
) {
  if (!posts || posts.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No posts in this category yet. Be the first to start a discussion!</p>
        </CardContent>
      </Card>
    )
  }

  return posts.map((post) => (
    <Card key={post.id} className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">{post.author}</CardTitle>
              <CardDescription>
                {post.authorRole} • {post.timestamp}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-line">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)} className="flex gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1"
            onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.replies.length}</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
      </CardFooter>

      {/* Replies section */}
      <div className="px-6 pb-4">
        {post.replies && post.replies.length > 0 && (
          <div className="border-t pt-4 mt-2">
            <h4 className="text-sm font-medium mb-3">Replies</h4>
            <div className="space-y-4">
              {post.replies.map((reply, index) => (
                <div key={index} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.avatar} alt={reply.author} />
                    <AvatarFallback>{reply.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-sm">{reply.author}</span>
                        <span className="text-xs text-muted-foreground ml-2">{reply.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-1 whitespace-pre-line">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply form */}
        {replyingTo === post.id && (
          <div className={`${post.replies && post.replies.length > 0 ? "mt-4" : "border-t pt-4 mt-2"}`}>
            <h4 className="text-sm font-medium mb-3">Write a reply</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`reply-name-${post.id}`} className="block text-xs font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id={`reply-name-${post.id}`}
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    placeholder="Enter your name"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-2 text-sm text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`reply-email-${post.id}`} className="block text-xs font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id={`reply-email-${post.id}`}
                    value={replyEmail}
                    onChange={(e) => setReplyEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-2 text-sm text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B]"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px] flex-1 text-sm"
                  required
                />
                <Button
                  onClick={() => handleReplySubmit(post.id)}
                  disabled={replyLoading}
                  className="self-end bg-primary hover:bg-primary/90 text-white"
                >
                  {replyLoading ? "Sending..." : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  ))
}
